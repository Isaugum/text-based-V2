import { useEffect, useState } from "react";

const DisplayConsole = ({ actionLogs }: any) => {

    return (
        <>
            <div>
                {
                    actionLogs.map((log: string) => {
                        return <p>{log}</p>
                    })
                }
            </div>
        </>
    )
}

export { DisplayConsole };