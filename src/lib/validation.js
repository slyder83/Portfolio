const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const NAME_MIN = 2
export const NAME_MAX = 100
export const EMAIL_MAX = 254
export const MESSAGE_MIN = 10
export const MESSAGE_MAX = 5000

export const validateContact = ({ name, email, message }) => {
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()
    const trimmedMessage = message.trim()

    const errors = {}

    if (trimmedName.length < NAME_MIN || trimmedName.length > NAME_MAX) {
        errors.name = `El nombre debe tener entre ${NAME_MIN} y ${NAME_MAX} caracteres.`
    }

    if (trimmedEmail.length > EMAIL_MAX || !EMAIL_REGEX.test(trimmedEmail)) {
        errors.email = "Introduce una dirección de correo válida."
    }

    if (
        trimmedMessage.length < MESSAGE_MIN ||
        trimmedMessage.length > MESSAGE_MAX
    ) {
        errors.message = `El mensaje debe tener entre ${MESSAGE_MIN} y ${MESSAGE_MAX} caracteres.`
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
        values: {
            name: trimmedName,
            email: trimmedEmail,
            message: trimmedMessage,
        },
    }
}
