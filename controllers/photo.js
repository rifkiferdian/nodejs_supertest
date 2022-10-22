const { Photo } = require("../models");

class PhotoController {
    static async GetAllPhotos(req, res) {
        try {
            const data = await Photo.findAll();
            if (!data) {
                res.status(400).json({
                    error: "Photo tidak ada",
                });
            }else {
                res.status(200).json(data);
            }

        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }

    static async GetOnePhotosByID(req, res) {
        try {
            const id = req.params.id
            const data = await Photo.findAll({
                where: {
                    id: id
                }
            });
            if (!data) {
                res.status(400).json({
                    error: "photo tidak ada",
                });
            }else {
                res.json(data);
            }

        } catch (error) {
            res.status(500).json({message:error.message});
        }
    }

    static async CreatePhoto(req, res){
        try {
            const result = await Photo.create(req.body);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = PhotoController;