import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import fs from "fs"
import { BASE_URL } from "../global";

const prisma = new PrismaClient({ errorFormat: "pretty" })

export const getAllFoods = async (request: Request, response: Response) => {
    try {
        const { search } = request.query
        const allFoods = await prisma.foods.findMany({
            where: { name: { contains: search?.toString() || "" } }
        })
        return response.json({
            status: true,
            data: allFoods,
            message: `Foods has retrieved`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const createFoods = async (request: Request, response: Response) => {
    try {
        const { name, price, spicy_level, quantity} = request.body /** get requested data (data has been sent from request) */

        /** variable filename use to define of uploaded file name */
        let filename = ""
        if (request.file) filename = request.file.filename /** get file name of uploaded file */

        const newFood = await prisma.foods.create({
            data: { name, price: Number(price), image: filename, spicy_level, quantity:Number(quantity)}
        })
        /** price and stock have to convert in number type */

        return response.json({
            status: true,
            data: newFood,
            message: `New food has created`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const updateFoods = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        const { name, price, quantity,spicy_level } = request.body /** get requested data (data has been sent from request) */

        /** make sure that data is exists in database */
        const findFood = await prisma.foods.findFirst({ where: { id: Number(id) } })
        if (!findFood) return response
            .status(200)
            .json({ status: false, message: `foods is not found` })

        let filename = findFood.image /** default value of variable filename based on saved information */
        if (request.file) {
            filename = request.file.filename
            let path = `${BASE_URL}/public/image/${findFood.image}`
            let exists = fs.existsSync(path)
            if (exists && findFood.image !== ``) fs.unlinkSync(path)

            /** this code use to delete old exists file if reupload new file */
        }


        const updatedFood = await prisma.foods.update({
            data: {
                name: name || findFood.name,
                price: price ? Number(price) : findFood.price,
                quantity: quantity ? Number(quantity) : findFood.quantity,
                spicy_level: spicy_level || findFood.spicy_level,
                image: filename
            },
            where: { id: Number(id) }
        })

        return response.json({
            status: true,
            data: updatedFood,
            message: `food has updated`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}

export const dropFoods = async (request: Request, response: Response) => {
    try {
        const { id } = request.params
        /** make sure that data is exists in database */
        const findFood = await prisma.foods.findFirst({ where: { id: Number(id) } })
        if (!findFood) return response
            .status(200)
            .json({ status: false, message: `Food is not found` })

        let path = `${BASE_URL}/public/image/${findFood.image}` /** define path (address) of file location */
        let exists = fs.existsSync(path)
        if (exists && findFood.image !== ``) fs.unlinkSync(path) /** if file exist, then will be delete */

        const deletedFood = await prisma.foods.delete({
            where: { id: Number(id) }
        })
        return response.json({
            status: true,
            data: deletedFood,
            message: `food has deleted`
        }).status(200)
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}