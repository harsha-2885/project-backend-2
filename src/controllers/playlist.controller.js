import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {

    const { name, description } = req.body;

    if (!name?.trim()) {
        throw new ApiError(
            400,
            "Playlist name is required"
        );
    }

    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user._id
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            playlist,
            "Playlist created successfully"
        )
    );
});

const getUserPlaylists = asyncHandler(async (req, res) => {

    const { userId } = req.params;

    if (!mongoose.isValidObjectId(userId)) {
        throw new ApiError(
            400,
            "Invalid user id"
        );
    }

    const playlists = await Playlist.find({
        owner: userId
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            playlists,
            "Playlists fetched successfully"
        )
    );
});

const getPlaylistById = asyncHandler(async (req, res) => {

    const { playlistId } = req.params;

    if (!mongoose.isValidObjectId(playlistId)) {
        throw new ApiError(
            400,
            "Invalid playlist id"
        );
    }

    const playlist =
        await Playlist.findById(playlistId)
            .populate("videos")
            .populate(
                "owner",
                "username avatar"
            );

    if (!playlist) {
        throw new ApiError(
            404,
            "Playlist not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            playlist,
            "Playlist fetched successfully"
        )
    );
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {

    const { playlistId, videoId } =
        req.params;

    const playlist =
        await Playlist.findByIdAndUpdate(
            playlistId,
            {
                $addToSet: {
                    videos: videoId
                }
            },
            {
                new: true
            }
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            playlist,
            "Video added successfully"
        )
    );
});

const removeVideoFromPlaylist =
    asyncHandler(async (req, res) => {

        const {
            playlistId,
            videoId
        } = req.params;

        const playlist =
            await Playlist.findByIdAndUpdate(
                playlistId,
                {
                    $pull: {
                        videos: videoId
                    }
                },
                {
                    new: true
                }
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                playlist,
                "Video removed successfully"
            )
        );
    });

const deletePlaylist =
    asyncHandler(async (req, res) => {

        const { playlistId } = req.params;

        await Playlist.findByIdAndDelete(
            playlistId
        );

        return res.status(200).json(
            new ApiResponse(
                200,
                {},
                "Playlist deleted successfully"
            )
        );
    });

const updatePlaylist =
    asyncHandler(async (req, res) => {

        const { playlistId } = req.params;

        const {
            name,
            description
        } = req.body;

        const playlist =
            await Playlist.findByIdAndUpdate(
                playlistId,
                {
                    $set: {
                        name,
                        description
                    }
                },
                {
                    new: true
                }
            );

        return res.status(200).json(
            new ApiResponse(
                200,
                playlist,
                "Playlist updated successfully"
            )
        );
    });

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}
