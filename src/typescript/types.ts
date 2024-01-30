export type TCat = {
  height: number
  width: number
  id: string
  url: string
  breeds: Record<string, string | number>
}

export type InitPayload = {
  cats: TCat[]
  favs: string[]
}

export type TActionProps = {
  type: string
  payload: InitPayload | string | string[] | TCat[]
}
