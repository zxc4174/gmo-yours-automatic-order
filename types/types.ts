export interface IAccount {
    id: string | undefined,
    email: string | undefined,
    password: string | undefined,
}

export interface IPeriod {
    calendar_start_unixtime: number,
    calendar_end_unixtime: number,
}
