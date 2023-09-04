export interface Club {
    id: string
    name: string
    zone: string
    total: number
}

export interface User {
    id: string
    idClub: string
    clubName: string
    clubZone?: string
    fcmToken?: string
    imgProfile?: {
        idPhoto: string,
        urlPhoto: string
    }
    email: string
    role:  "admin" | "director" |  "sub-director" | "secretary" | "treasurer" | "member"
    class?: string
    firstName: string
    lastName: string   
    total: 0
}
export interface Transaction{
    id: string
    idClub: string
    type: "transfer" | "deposit" | "payment"
    idSender: string
    sender?: Sender
    idReceiver: string
    receiver?: Receiver
    date: any
    amount: number
    reason: string
    img?: string
}
export interface Sender{
    firstName: string
    lastName: string
    profilePhoto: string
    totalAfter: number 
}
export interface Receiver{
    firstName: string
    lastName: string
    profilePhoto: string
    totalAfter: number
}
