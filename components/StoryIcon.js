import React from 'react';
import { connect } from 'react-redux';
import Icon from './Icon';
import { Badge } from 'react-native-elements'
import {
    View
} from 'react-native'

const mapStateToProps = ({ storyProgress }) => {
    const noOfUnreadParts = storyProgress && storyProgress.reduce((count, c) => {
        return count + Object.values(c.completedParts).filter(
            part => part.isUnlocked && !part.isRead
        ).length;
    }, 0)

    return {
        noOfUnreadParts
    };
};

const StoryIcon = props => {
    const { noOfUnreadParts } = props;
    const icon = <Icon { ...props }/>;
    
    if (noOfUnreadParts > 0) {
        return (
            <View>
                <Badge
                    value={ noOfUnreadParts }
                    badgeStyle={{ backgroundColor: '#831915'}}
                    containerStyle={{
                        zIndex: 999,
                        position: 'absolute',
                        top: -4,
                        right: -4
                    }}
                />
                { icon }
            </View>
        )
    }
    else return icon; 
};

export default connect(mapStateToProps)(StoryIcon);