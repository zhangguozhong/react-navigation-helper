import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
const uuid = require('uuid');
const { v4 } = uuid;

const withMappedNavigationProps = WrappedComponent => {
    //由props.navigation.state.params直接转化成this.props获取属性值
    const TargetComponent = props => {
        const params = props.navigation ? props.navigation.state.params : {};
        const { screenProps, ...propsExceptScreenProps } = props;
        const pageId = v4();

        return <WrappedComponent {...screenProps} {...propsExceptScreenProps} {...params} pageId={pageId}/>;
    };

    TargetComponent.displayName = `withMappedNavigationProps(${WrappedComponent.displayName ||
    WrappedComponent.name})`;

    return hoistNonReactStatic(TargetComponent, WrappedComponent);
};

const withMappedNavigationAndConfigProps = WrappedComponent => {
    const TargetWithHoistedStatics = withMappedNavigationProps(WrappedComponent);

    if (typeof WrappedComponent.navigationOptions === 'function') {
        TargetWithHoistedStatics.navigationOptions = navigationProps =>
            mapScreenConfigProps(navigationProps, WrappedComponent.navigationOptions);
    }
    return TargetWithHoistedStatics;
};

function mapScreenConfigProps(reactNavigationProps, navigationOptionsFunction) {
    const { navigation, screenProps, navigationOptions } = reactNavigationProps;
    const props = { ...screenProps, ...navigation.state.params, navigationOptions, navigation };
    return navigationOptionsFunction(props);
}

export {
    withMappedNavigationProps,
    withMappedNavigationAndConfigProps
}