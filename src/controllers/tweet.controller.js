import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {

    const { content } = req.body;

    if (!content?.trim()) {
        throw new ApiError(
            400,
            "Tweet content required"
        );
    }

    const tweet = await Tweet.create({
        content,
        owner: req.user._id
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            tweet,
            "Tweet created successfully"
        )
    );
});

const getUserTweets =
    asyncHandler(async (req, res) => {

        const { userId } = req.params;

        const tweets =
            await Tweet.find({
                owner: userId
            })
                .populate(
                    "owner",
                    "username avatar"
                )
                .sort({
                    createdAt: -1
                });

        return res.status(200).json(
            new ApiResponse(
                200,
                tweets,
                "Tweets fetched successfully"
            )
        );
    });

const updateTweet =
    asyncHandler(async (req, res) => {

        const { tweetId } = req.params;

        const { content } = req.body;

        const tweet =
            await Tweet.findByIdAndUpdate(
                tweetId,
                {
                    $set: {
                        content
                    }
                },
                {
                    new: true
                }
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                tweet,
                "Tweet updated successfully"
            )
        );
    });

const deleteTweet =
    asyncHandler(async (req, res) => {

        const { tweetId } = req.params;

        await Tweet.findByIdAndDelete(
            tweetId
        );

        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Tweet deleted successfully"
            )
        );
    });

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}
