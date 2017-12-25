import React from 'react';

export default class About extends React.Component {
    static propTypes = {
        name: React.PropTypes.string
    };
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>React教材漂流练习项目</div>
        );
    }
}
