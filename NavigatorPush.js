import { NavigationActions } from 'react-navigation';
const { BACK,NAVIGATE,setParams } = NavigationActions;
let _navigator, _routers;

/**
 * 设置顶层路由导航
 * @param navigatorRef
 */
function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}


/**
 * 设置当前路由栈
 * @param routers
 */
function setRouters(routers) {
    _routers = routers;
}


/**
 * 跳转到指定页面
 * @param routeName
 * @param params
 */
function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            type: NAVIGATE,
            routeName,
            params
        })
    );
}

/**
 * 返回到顶层
 */
function popToTop() {
    _navigator.dispatch(NavigationActions.popToTop());
}


/**
 * 返回
 */
function goBack() {
    _navigator.dispatch(NavigationActions.back({type: BACK}));
}


/**
 * 当前路由设置参数
 * @param params
 */
function setParameters(params) {
    const {state:{nav:{ index,routes }}} = _navigator;
    _navigator.dispatch(
        setParams({
            key:routes[index].key,
            params
        })
    );
}

export default {
    setTopLevelNavigator,
    setRouters,
    navigate,
    goBack,
    popToTop,
    setParameters
};