export interface Color {
  id: number
  hex: string
  name: string
}

export interface Task {
  id: number
  text: string
  completed: boolean
  listId: number
}

export interface List extends OnlyList {
  tasks: Task[]
  color: Color
}

export interface OnlyList {
  id: number
  name: string
  colorId: number
}
