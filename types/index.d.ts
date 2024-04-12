type Nullable<T> = T | null
type Undefinedable<T> = T | undefined
type Emptyable<T> = Nullable<T> & Undefinedable<T>

type BaseMongooseObject = {
    _id: string
    createdAt: Date
    updatedAt: Date
    isDeleted: boolean
}

type User = BaseMongooseObject & {
    username: string
    email: string
    role: string[]
    status: boolean
}

type Room = BaseMongooseObject & {
    name: string
    roomId: string
    owner: User
    messages: Emptyable<Message[]>
}

type Message = BaseMongooseObject & {
    content: string
    room: Emptyable<Room>
    author: Emptyable<User>
}
