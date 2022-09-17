import React, { ReactElement } from "react";

export interface ITableLineTwoColumn {
    label: string;
    value: string|ReactElement;
    textSize?: string
}

export interface ITable {
    lines: Array<ReactElement>
}

export const TableLineWithTwoColumn = (props: ITableLineTwoColumn) => {
    const textSize = (props.textSize) ? props.textSize : "text-sm";
    return (
        <tr className="w-full">
            <td className={`py-1 text-left pl-2 ${ textSize }`}> 
                { props.label }
            </td>
            <td className={`py-1 text-right pr-2 ${ textSize }`}> 
                { props.value }
            </td>                         
        </tr>
    );
}

export const Table = (props: ITable) => {
    return (
        <div className="w-full rounded-lg overflow-hidden border">
            <table className="w-full">
                <tbody>
                    { props.lines.map( (item, k) => { return <React.Fragment key={k}> { item } </React.Fragment> }) }
                </tbody>
            </table>
        </div>
    );
}
