import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {

    const { channelId } = req.params;

    if (!mongoose.isValidObjectId(channelId)) {
        throw new ApiError(
            400,
            "Invalid channel id"
        );
    }

    const existingSubscription =
        await Subscription.findOne({
            subscriber: req.user._id,
            channel: channelId
        });

    if (existingSubscription) {

        await Subscription.findByIdAndDelete(
            existingSubscription._id
        );

        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Unsubscribed successfully"
            )
        );
    }

    const subscription =
        await Subscription.create({
            subscriber: req.user._id,
            channel: channelId
        });

    return res.status(201).json(
        new ApiResponse(
            201,
            subscription,
            "Subscribed successfully"
        )
    );
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers =
    asyncHandler(async (req, res) => {

        const { channelId } = req.params;

        if (
            !mongoose.isValidObjectId(
                channelId
            )
        ) {
            throw new ApiError(
                400,
                "Invalid channel id"
            );
        }

        const subscribers =
            await Subscription.find({
                channel: channelId
            }).populate(
                "subscriber",
                "username avatar"
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                subscribers,
                "Subscribers fetched successfully"
            )
        );
    });

// controller to return channel list to which user has subscribed
const getSubscribedChannels =
    asyncHandler(async (req, res) => {

        const subscriptions =
            await Subscription.find({
                subscriber: req.user._id
            }).populate(
                "channel",
                "username avatar"
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                subscriptions,
                "Subscribed channels fetched successfully"
            )
        );
    });

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}