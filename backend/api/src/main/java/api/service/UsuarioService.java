package api.service;

import api.dto.LoginRequest;
import api.dto.RegistroRequest;
import api.dto.UsuarioResponse;
import api.model.Usuario;
import api.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional
    public UsuarioResponse registrar(RegistroRequest request) {
        if (usuarioRepository.existsByNombreUsuario(request.nombreUsuario())) {
            throw new UsuarioYaExisteException(
                    "El usuario '" + request.nombreUsuario() + "' ya existe");
        }

        String hash = passwordEncoder.encode(request.contrasena());
        Usuario usuario = new Usuario(request.nombreUsuario(), hash, request.edad(), request.zona());
        usuarioRepository.save(usuario);

        return toResponse(usuario);
    }

    public UsuarioResponse login(LoginRequest request) {
        Usuario usuario = usuarioRepository.findByNombreUsuario(request.nombreUsuario())
                .orElseThrow(() -> new CredencialesInvalidasException("Usuario o contraseña incorrectos"));

        if (!passwordEncoder.matches(request.contrasena(), usuario.getContrasenaHash())) {
            throw new CredencialesInvalidasException("Usuario o contraseña incorrectos");
        }

        return toResponse(usuario);
    }

    private UsuarioResponse toResponse(Usuario usuario) {
        return new UsuarioResponse(
                usuario.getId(),
                usuario.getNombreUsuario(),
                usuario.getEdad(),
                usuario.getZona()
        );
    }

    public static class UsuarioYaExisteException extends RuntimeException {
        public UsuarioYaExisteException(String message) {
            super(message);
        }
    }

    public static class CredencialesInvalidasException extends RuntimeException {
        public CredencialesInvalidasException(String message) {
            super(message);
        }
    }
}