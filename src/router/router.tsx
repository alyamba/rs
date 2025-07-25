import { App } from '../App';
import { ErrorPage } from '../pages';

const router = [{ path: '/', element: <App />, errorElement: <ErrorPage /> }];

export default router;
