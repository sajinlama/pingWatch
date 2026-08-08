import { Router } from "express";
import { userLogin, UserRegister, userLogout } from "./authController.js";
import { authenticate } from "../../middleware/auth.middleware.js"; 
const router = Router();

// Public routes (no authentication middleware needed)
router.post("/register", UserRegister);
router.post("/login", userLogin);
router.post("/logout", userLogout);

router.get("/me", authenticate, (req, res) => {
return res.status(200).json({
    success: true,
    message: "Authenticated user accessed profile",
  });
});

export default router;