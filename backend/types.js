const zod = require("zod")


//{
//     title:
//     description:
// }

const createTodoSchema = zod.object({
    title: zod.string().min(1),
    description: zod.string().min(1)
})


//{
//     id:
// }
const updateTodoSchema = zod.object({
    id: zod.string()
})

module.exports = {
    createTodoSchema: createTodoSchema,
    updateTodoSchema: updateTodoSchema
}