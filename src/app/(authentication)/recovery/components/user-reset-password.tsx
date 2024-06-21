"use client"

import * as React from "react"

import { cn, validateEmail, validatePassword } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { AlertComponent } from "./alert"

interface UserResetPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserResetPasswordForm({ className, ...props }: UserResetPasswordFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const [password, setPassword] = React.useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = React.useState<string>('');

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
    }

    return (
        <div className={cn("grid", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-10">
                    {
                        !validatePassword(password, passwordConfirmation).isValid && validatePassword(password, passwordConfirmation).id === 2 &&
                        <AlertComponent helperText={validatePassword(password, passwordConfirmation).message} />
                    }
                    <div className="grid gap-4">
                        <Label className="text-purple-700 font-semibold text-[16px]" htmlFor="password">
                            Nova senha
                        </Label>
                        <Input
                            id="password"
                            placeholder="Digite aqui uma nova senha"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="new-password"
                            autoCorrect="off"
                            disabled={isLoading}
                            onChange={(e) => setPassword(e.target.value)}
                            helperText={!validatePassword(password, passwordConfirmation).isValid && validatePassword(password, passwordConfirmation).id === 1 ? validatePassword(password, passwordConfirmation)?.message : ''}
                            error={!validatePassword(password, passwordConfirmation).isValid && password.length > 0 && validatePassword(password, passwordConfirmation).id === 1}
                        />
                    </div>
                    <div className="grid gap-4">
                        <Label className="text-purple-700 font-semibold text-[16px]" htmlFor="passwordConfirmation">
                            Repetir nova senha
                        </Label>
                        <Input
                            id="passwordConfirmation"
                            placeholder="Digite aqui novamente a nova senha"
                            type="password"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={isLoading}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            error={!validatePassword(password, passwordConfirmation).isValid && passwordConfirmation.length > 0}
                        />
                    </div>
                    <Button
                        disabled={isLoading || !validatePassword(password, passwordConfirmation).isValid}
                        isLoading={isLoading}
                        label="Confirmar nova senha"
                    />
                </div>
            </form>
        </div>
    )
}