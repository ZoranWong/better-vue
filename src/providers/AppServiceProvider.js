import ServiceProvider from './ServiceProvider';
export default class AppServiceProvider extends ServiceProvider{
    boot () {
        console.log('%c ============================================== \n' +
            ' ||                                          || \n' +
            ' ||          MP VUE APPLICATION RUN          || \n' +
            ' ||                                          || \n' +
            ' ============================================== ',
            'background:#aaa;color:#bada55');
    }
}
