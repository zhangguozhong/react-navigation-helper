import { NavigationActions,StackActions } from 'react-navigation';
const { BACK,NAVIGATE,setParams } = NavigationActions;
let _navigator, _routers;
const flushQueue = [];

/**
 * 设置顶层路由导航
 * @param navigatorRef
 */
function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
    if (_navigator && flushQueue.length > 0) {
        for (let params of flushQueue) {
            setParameters(params);
            flushQueue.remove(params);
        }
    }
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
    _navigator.dispatch(StackActions.popToTop());
}


/**
 * 返回
 */
function goBack() {
    _navigator.dispatch(NavigationActions.back({type: BACK}));
}

/**
 * 重置路由
 * @param index
 * @param routeNames
 */
function resetRoute(index,routeNames) {
    if (!routeNames || routeNames.length === 0 || index > (routeNames.length - 1)) {
        return;
    }

    let routeActions = routeNames.map((route) => {
        return NavigationActions.navigate(route);
    });
    _navigator.dispatch(StackActions.reset({
        index:index,
        actions:routeActions
    }));
}


/**
 * 当前路由设置参数
 * @param params
 */
function setParameters(params) {
    if (!_navigator) {
        flushQueue.push(params);
        return;
    }

    const { state:{ nav } } = _navigator;
    let route = getRoute(nav);
    _navigator.dispatch(
        setParams({
            key:route.key,
            params
        })
    );
}

function getRoute(route) {
    const { index,routes } = route;
    if (!routes) {
        return route;
    }

    const subRoute = routes[index];
    return getRoute(subRoute);
}

export default {
    setTopLevelNavigator,
    setRouters,
    navigate,
    goBack,
    popToTop,
    setParameters,
    resetRoute
};