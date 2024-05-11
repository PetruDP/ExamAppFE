// Delay requests to test loading state
export const delay = (seconds: number, shouldReject: boolean = false) => {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            if(shouldReject) reject(Error("Failed to fetch (delay.ts)"))
            resolve();
        }, seconds * 1000)
    })
}