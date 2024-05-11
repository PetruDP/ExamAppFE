export const Roles = {
    user: "User",
    admin: "Admin"
} as const

export const ImgSizes = {
    0: [190, 281],
    1: [285, 442],
    2: [380, 562]
}

export const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,32}$/
export const USERNAME_REGEX = /^[a-zA-Z ]{2,}$/

export const ONE_UPPERCASE = /.*[A-Z].*/
export const ONE_LOWERCASE = /.*[a-z].*/
export const ONE_DIGIT = /.*[0-9].*/
export const ONE_SPECIAL = /.*[#?!@$ %^&*-].*/
export const AT_LEAST_8_32 = /^.{8,32}$/