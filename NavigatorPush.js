import { NavigationActions,StackActions } from 'react-navigation';
const { BACK,NAVIGATE,setParams } = NavigationActions;
let _navigator, _routers;
const flushQueue = [];
const initParams = {};

const NavigatorPush = {

    routeInterceptor:function (routeName,params) {//拦截路由
        return true;
    },

    setTopLevelNavigator:function (navigatorRef) {
        _navigator = navigatorRef;
        if (_navigator && flushQueue.length > 0) {
            for (let params of flushQueue) {
                this.setParameters(params);
                flushQueue.remove(params);
            }
        }
    },

    setRouters:function (routers) {
        _routers = routers;
    },

    navigate:function (routeName, params) {
        if (this.routeInterceptor && !this.routeInterceptor(routeName,params)) {//拦截路由，比如是否登录
            return;
        }

        _navigator.dispatch(
            NavigationActions.navigate({ type: NAVIGATE,routeName,params })
        );
    },


    popToTop:function (params = initParams) {
        _navigator.dispatch(StackActions.popToTop(params));
    },
    popN:function (n,params = initParams) {
        _navigator.dispatch(StackActions.pop({ n,params }));
    },


    goBack:function () {
        _navigator.dispatch(NavigationActions.back({ type:BACK }));
    },


    resetRoute:function (index, routeNames) {
        if (!routeNames || routeNames.length === 0 || index > (routeNames.length - 1)) {
            return;
        }

        const routeActions = routeNames.map((route) => {
            return NavigationActions.navigate(route);
        });
        _navigator.dispatch(StackActions.reset({ index:index,actions:routeActions }));
    },


    setParameters:function (params) {
        if (!_navigator) {
            flushQueue.push(params);
            return;
        }

        const { state:{ nav } } = _navigator;
        const route = getRoute(nav);
        _navigator.dispatch(setParams({ key:route.key,params }));
    },


    resetTargetRoute:function (targetRouteName,routeNames) {
        if (!_navigator) {
            return;
        }

        const { state:{nav:{ routes }} } = _navigator;
        const targetIndex = routes.findIndex(item => item.routeName === targetRouteName);
        if (targetIndex > 0) {
            let targetRoutes = routes.filter((item,index) => index <= targetIndex);

            if (targetRoutes && targetRoutes.length > 0) {
                const finalTargetRoutes = targetRoutes.concat(routeNames);
                const routeActions = finalTargetRoutes.map((route) => {
                    return NavigationActions.navigate(route);
                });

                _navigator.dispatch(StackActions.reset({
                    index:routeActions.length - 1,
                    actions:routeActions
                }));
            }
        }
    }
}

function getRoute(route) {
    const { index,routes } = route;
    if (!routes) {
        return route;
    }
    const subRoute = routes[index];
    return getRoute(subRoute);
}

export default NavigatorPush;