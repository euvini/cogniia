"use client"

import * as React from "react"

import { cn, validateEmail } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { register } from "@/services/authService"
import { useRouter } from "next/navigation"

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserRegisterForm({ className, ...props }: UserRegisterFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [showPassword, setShowPassword] = React.useState<boolean>(false)

    const [name, setname] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        register({ nome: name, email, password })
            .then(() => {
                setIsLoading(false)
                alert('cadastro realizado')
                router.refresh()
            }).catch(e => {
                setIsLoading(false)
                alert('erro no cadastro')
            })
    }

    return (
        <div className={cn("grid", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-8">
                    <div className="grid gap-2">
                        <Label className="text-purple-700 font-semibold text-[16px]" htmlFor="name">
                            Nome
                        </Label>
                        <Input
                            id="name"
                            placeholder="Digite seu nome aqui"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="name"
                            autoCorrect="off"
                            disabled={isLoading}
                            onChange={(e) => setname(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-purple-700 font-semibold text-[16px]" htmlFor="email">
                            E-mail
                        </Label>
                        <Input
                            id="email"
                            placeholder="Digite seu e-mail aqui"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label className="text-purple-700 font-semibold text-[16px]" htmlFor="password">
                            Senha
                        </Label>
                        <Input
                            id="password"
                            placeholder="Crie uma senha e digite aqui"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            onChange={(e) => setPassword(e.target.value)}
                            helperText="A senha deve ter no mínimo 8 caracteres."
                            error={password.length > 0 && password.length < 8}
                            passwordIcon
                            showPassword={showPassword}
                            setShowPassword={() => setShowPassword(!showPassword)}
                        />
                    </div>
                    <a className="text-grey-700 text-sm mt-4">
                        Ao cadastrar-se, você aceita nossos <b className="text-purple-400 underline hover:cursor-pointer">Termos de uso</b> e <b className="text-purple-400 underline hover:cursor-pointer">Política de Privacidade</b>.
                    </a>
                    <Button
                        disabled={isLoading || !validateEmail(email) || password === ''}
                        isLoading={isLoading}
                        label="Entrar"
                    />
                </div>
            </form>
        </div>
    )
}