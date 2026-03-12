package com.example.auth;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
// 접속하는 모든 출처를 허용하되, 쿠키(credentials)를 포함할 수 있도록 설정
@CrossOrigin(originPatterns = "*", allowCredentials = "true")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String password = request.get("password");

        if ("admin".equals(userId) && "1234".equals(password)) {
            // HttpOnly 쿠키 생성 (이름: accessToken)
            ResponseCookie cookie = ResponseCookie.from("accessToken", "dummy-jwt-token-123456789")
                    .httpOnly(true) // 자바스크립트로 접근 불가 (보안강화)
                    .secure(false) // HTTPS에서만 작동하려면 true 로 해야하지만 로컬은 false
                    .path("/") // 앱의 모든 경로에서 이 쿠키 사용 가능
                    .maxAge(60 * 60) // 1시간 짜리 쿠키
                    .sameSite("Lax")
                    .build();

            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, cookie.toString())
                    .body(Map.of("success", true, "message", "로그인에 성공했습니다."));
        } else {
            return ResponseEntity.status(401)
                    .body(Map.of("success", false, "message", "아이디 또는 비밀번호가 잘못되었습니다."));
        }
    }

    // 로그인된 유저인지 확인하는 API (앱 진입 시 라우터에서 호출)
    @GetMapping("/me")
    public ResponseEntity<?> getMe(@CookieValue(value = "accessToken", required = false) String accessToken) {
        if (accessToken != null && accessToken.equals("dummy-jwt-token-123456789")) {
            return ResponseEntity.ok(Map.of(
                    "success", true,
                    "user", Map.of("id", "admin", "name", "관리자")));
        } else {
            return ResponseEntity.status(401)
                    .body(Map.of("success", false, "message", "인증되지 않은 사용자입니다."));
        }
    }
}
