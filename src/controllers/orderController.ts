import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { getAllFoods } from "./foodControllers";

const prisma = new PrismaClient({ errorFormat: "pretty" })

export const getOrder = async (request: Request, response: Response) => {
    try {
        const { search } = request.query
        const allOrder = await prisma.orders_list.findMany({
            where: {
                OR: [
                    { customer_name: { contains: search?.toString() || "" } },
                    { table_number: { contains: search?.toString() || "" } }
                ]
            },
            orderBy: { order_date: "desc" },
            include: { order_details:{include:{food:true}} },
        })

        return response.json({
            status: true,
            data: allOrder,
            message: `Order List har retrieved`
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

export const createOrder = async (request: Request, response: Response) => {
    try {
        const { customer_name, table_number, order_date, order_details } = request.body

        const newOrder = await prisma.orders_list.create({
            data: {
                customer_name,
                table_number,
                order_date
            }
        })

        for (let index = 0; index < order_details.length; index++) {
            const { food_id, quantity, price } = order_details[index]
            await prisma.order_details.create({
                data: {
                    order_id: newOrder.id,
                    food_id: Number(food_id),
                    quantity: Number(quantity),
                    price: Number(price)
                }
            })
        }
        return response.json({
            status: true,
            data: newOrder,
            message: `New Order has created`
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

export const deleteOrder = async (request: Request, response: Response) => {
    try {
        const { id } = request.params

        const findOrder = await prisma.orders_list.findFirst({
            where: {
                id: Number(id)
            }
        })

        if (!findOrder) return response.status(200).json({
            status: false,
            message: `Order is not found`
        })

        let deleteOrderDetail = await prisma.order_details.deleteMany({
            where: {
                order_id: Number(id)
            }
        })

        let dropOrder = await prisma.orders_list.delete({
            where: {
                id: Number(id)
            }
        })

        return response.json({
            status: true,
            data: dropOrder,
            message: `Order has deleted`
        })
    } catch (error) {
        return response
            .json({
                status: false,
                message: `There is an error. ${error}`
            })
            .status(400)
    }
}