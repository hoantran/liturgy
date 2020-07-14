import React, { Component } from 'react'

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Job</th>
            </tr>
        </thead>
    )
}

//Always use keys when making lists in React to identify each list item
//onClick must pass through a function that returns removeCharacter otherwise it will attempt to execute immediately?
const TableBody = props => {
    const rows = props.characterData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.job}</td>
                <td>
                    <button onClick={() => props.removeCharacter(index)}>Delete</button>
                </td>
            </tr>
        )
    })
    return (
        <tbody>{rows}</tbody>
    )
}

//Table takes a parameter, characterData and passes it to TableBody
// class Table extends Component {
//     render() {
//         const { characterData } = this.props

//         return (
//             <table>
//                 <TableHeader />
//                 <TableBody characterData={characterData}/>
//             </table>
//         )
//     }
// }

//Convert Table class component to a function component since it does not have own state
//Remove this.props since this is now a function, no longer have instances of class
const Table = props => {
    const { characterData, removeCharacter } = props
    return (
        <table>
            <TableHeader />
            <TableBody characterData={characterData} removeCharacter={removeCharacter}/>
        </table>
    )
}

export default Table

//Note the difference between Function Components and Class Components
