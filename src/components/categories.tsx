import * as React from "react";
import {questionService} from "../services/question-service";

interface ICategoryProps {
    onChange : Function;
}

export class Categories extends React.Component<ICategoryProps,any> {

    componentWillMount () {
        this.state = {
            selectedVal : null,
            categoryList : []
        }

        questionService.getCategories().then((cats) => {
            this.setState({
                categoryList: cats          //sobald das da ist, wird render aufgerufen
            })
        })

    }

    handleChange (e) {
        this.setState({
            selectedVal : e.target.value
        });

        if (this.props.onChange) {
            this.props.onChange(e.target.value);
        }
    }


    render () {

        return (
            <select value={this.state.selectedVal} onChange={this.handleChange.bind(this)} className="btn-gray">

                <option>Wähle aus</option>

                { this.state.categoryList.map((item,i) =>

                    <option key={i}>{item.name}</option>

                )}

            </select>
        )
    }

}