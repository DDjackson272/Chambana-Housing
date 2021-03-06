import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchHousings} from "../store/actions/houses";
import HousingItem from "../Components/HousingItem"
import SearchComponent from "../Components/SearchComponent";

class HousingList extends Component {
    componentDidMount() {
        this.props.fetchHousings();
    }

    render() {
        const {housings} = this.props;

        console.log(housings);

        let housingList = housings.map((h, index) => (
            <HousingItem
                key={index}
                housing_name={h.housing_name}
                housing_username={h.housing_username}
                housing_type={h.housing_type}
                img_url={h.img_url}
                housing_id={h.housing_id}
                overall_comment={h.overall_comment}
                visited={h.visited}
            />
        ));

        return (
            <div>
                <SearchComponent
                    {...this.props}
                />
                <div className="row text-center" id="housings">
                    {housingList}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        housings: state.housings,
        currentUser: state.currentUser
    };
}

export default connect(mapStateToProps, {fetchHousings})(HousingList);