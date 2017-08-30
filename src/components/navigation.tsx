import * as React from "react";

export class Navigation extends React.Component<any, any> {


    private navItems:Array<any> = [
        "eins",
        "zwei",
        "drei"
    ];
    

    render() {

        return (
            <ul data-component="navigation">
                { this.navItems.map((item, i) => 
                    <li key={i}> {item} </li>
                )}
            </ul>
        )
    }
}

