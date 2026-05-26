import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
const getChannelStats = asyncHandler(async (req, res) => {

    const channelId = req.user?._id;

    const totalVideos = await Video.countDocuments({
        owner: channelId
    });

    const videoStats = await Video.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(channelId)
            }
        },
        {
            $group: {
                _id: null,
                totalViews: {
                    $sum: "$views"
                }
            }
        }
    ]);

    const totalSubscribers =
        await Subscription.countDocuments({
            channel: channelId
        });

    const videoIds = await Video.find(
        {
            owner: channelId
        },
        {
            _id: 1
        }
    );

    const ids = videoIds.map(
        (video) => video._id
    );

    const totalLikes =
        await Like.countDocuments({
            video: {
                $in: ids
            }
        });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalViews:
                    videoStats[0]?.totalViews || 0,
                totalSubscribers,
                totalVideos,
                totalLikes
            },
            "Channel stats fetched successfully"
        )
    );
});

const getChannelVideos = asyncHandler(async (req, res) => {

    const channelId = req.user?._id;

    const videos = await Video.find({
        owner: channelId
    }).sort({
        createdAt: -1
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            videos,
            "Channel videos fetched successfully"
        )
    );
});

export {
    getChannelStats, 
    getChannelVideos
    }