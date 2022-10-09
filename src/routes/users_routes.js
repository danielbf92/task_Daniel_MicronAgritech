import {Router} from "express";
import { methods as userController} from "./../controllers/users_controller";

const router=Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.post("/login", userController.userLogin);
router.post("/", userController.addUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;