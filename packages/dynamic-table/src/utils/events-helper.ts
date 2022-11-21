import mitt from 'mitt'

type Events = {
  reload: void
  preview: {
    title: string
    record: Record<string, any>
    columns: number
    labelWidth?: string
  }
  updateForm: Record<string, any>
}

export const events = mitt<Events>()
