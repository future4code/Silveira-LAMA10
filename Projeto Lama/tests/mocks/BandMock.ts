import { Band, BandInputDTO } from "../../src/model/Band";

const name = "Labebanda"
const genre = "Psicodélico"
const responsible = "João das Coves"

export const bandMock: BandInputDTO = {
    name,
    genre,
    responsible
}

export const bandMock2: BandInputDTO = {
    name: "Laband",
    genre: "pagode",
    responsible:""
}