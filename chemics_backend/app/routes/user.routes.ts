import { verifyToken, isAdmin} from '../middlewares/authJwt';

module.exports = function(app: any) {
  app.use(function(req: any, res: any, next: any) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // app.get("/api/test/all", controller.allAccess);

  // app.get("/api/test/user", [verifyToken], controller.userBoard);

  // app.get(
  //   "/api/test/admin",
  //   [verifyToken, isAdmin],
  //   controller.adminBoard
  // );
};