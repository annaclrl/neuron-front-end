import { jwtDecode } from "jwt-decode";
import type { DadosLogin } from "../types/usuario";

interface MyToken {
  iss: string;
  sub: string;
  id: number;
  role: number;
  exp: number; 
  iat: number;
  jti: string;
}

export async function login(usuario: DadosLogin): Promise<string> {
    const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario), 
    });

    if (!response.ok) {
        throw new Error("Login falhou! Verifique suas credenciais.");
    }

    const data: { token: string } = await response.json(); 
    localStorage.setItem("token", data.token);

    const decoded = jwtDecode<MyToken>(data.token);

    localStorage.setItem("userId", String(decoded.id));

    return data.token;
}

export function isTokenValid(): boolean {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const decoded = jwtDecode<MyToken>(token);
        const currentTime = Date.now() / 1000;

        return decoded.exp > currentTime;
    } catch (err) {
        console.error("Erro ao decodificar token:", err);
        return false;
    }
}
