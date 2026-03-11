package com.example.auth;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
// 로컬 테스트를 위해 CORS 허용 (Vue 앱 포트 5173 지원)
@CrossOrigin(origins = "*")
public class AuthController {

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String password = request.get("password");

        // 아주 간단한 하드코딩 인증 (admin / 1234)
        if ("admin".equals(userId) && "1234".equals(password)) {
            return Map.of(
                    "success", true,
                    "token", "dummy-jwt-token-123456789",
                    "message", "로그인에 성공했습니다.");
        } else {
            return Map.of(
                    "success", false,
                    "message", "아이디 또는 비밀번호가 잘못되었습니다.");
        }
    }
}
