import mitt from 'mitt'

type Events = {
  reload: void
  updateForm: Record<string, any>
}

export const events = mitt<Events>()
