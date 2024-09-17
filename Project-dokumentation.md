### Project-dokumentation

## Min Techstack:

1. ### React
2. ### React-hook-form
3. ### React-icons
4. ### React-router
5. ### Tailwind
6. ### Tailwind-styled-components

## Teknisk Dokumentation

### React

Jeg bruger react på grund af SPA (Single-page application) som passer til dette projekt, fordi at der er flere sider med dynamisk indhold. Reacts komponentbaseret arkitektur hjælper også med en bedre kode organisation.

## React-hook-form

React hook form hjælper med at validere forms og state mangement. Det hjælper validering ved at mindske re-render og simplificere koden.
Jeg bruger desuden zod til give feedback til brugeren om hvilke krav der er til formen som skal udfyldes.

## React-icons

React-icons er et stort bibliotek som gør det muligt nemt at hente, bruge og udskifte ikoner som der er brug for I projektet. React-icons hjælper også med at gøre det nemt at skalere projektet ved f.eks. at have et ensformet look, kommer ofte med indbygget accessibility som ARIA-attributes, react-icons bruger typisk SVG ikoner som er optimeret for performance

## React-router:

React-router giver muligheden for at lave client-side routing som bruges til SPA. Det kan give brugeren en bedre oplevelse end server-side når der er flere sider og sider med dynamisk indhold.

## Tailwind:

Tailwind er et css værktøj der giver udvikleren mulighed for at lave css hurtig, ensformet og med mindre kode end normal css. Tailwind gør det også nemt at skalere og veligeholde et project. Desuden giver tailwind dig stadig muligheden for at lave custom css regler, som f.eks. at lave et custom farve tema, hvis de pre defineret klasser ikke er tilstrækkelige.

## Tailwind-styled-components

Jeg bruger tailwind styled components som er en kombination tailwind og styled components. Styled components er en komponentbaseret tilgang til at style med.

## Kode til særlig bedømmelseimport

<code> const {
register,
handleSubmit,
setError,
formState: { errors, isSubmitting },
} = useForm({
resolver: zodResolver(schema),
});</code>

## Min tilføjelser og rettelser:

Jeg har valgt at tilføje navigation til log in siden I tilfælde af at man ikke vil logge ind. Jeg har også valgt at ændre ”enter your e-mail” til ”enter your username” da der ikke bliver efterspurgt en e-mail, men brugernavn.

## Valgfriopgave

Automatiseret Deployment
https://terminspr-ve-uge7-nick-b-lau.vercel.app/

## Refleksion

Man kunne tilføje en TrainerDetails side. Hvor man evt. kunne se om en træner havde andre hold, deres erfaringer og rate træneren

## [ Af Nickolaj Berntsen Lau ]
