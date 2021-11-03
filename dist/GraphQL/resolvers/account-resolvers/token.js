export default async function (parent, args, context, info) {
    if (!['login', 'register', 'submitPasswordReset'].includes(info.path.prev.key)) {
        // token should only be sent when a user logs in, registers or resets their password
        return null;
    }
    else {
        return parent.tokens[parent.tokens.length - 1].token;
    }
}
//# sourceMappingURL=token.js.map