package api.dto;

public record UsuarioResponse(
        Long id,
        String nombreUsuario,
        Integer edad,
        String zona
) {}