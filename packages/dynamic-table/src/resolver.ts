const DEFAULT_COMPONENT_NAME = 'DynamicTable'

type DyanmicTableResolverOptions = {
  componentName: string
}

export function DynamicTableResolver(
  options?: DyanmicTableResolverOptions
): any {
  return {
    type: 'component',
    resolve: (name: string) => {
      const packageName = '@gopowerteam/vue-dynamic-table'
      if (name === options?.componentName ?? DEFAULT_COMPONENT_NAME) {
        return {
          name: DEFAULT_COMPONENT_NAME,
          from: packageName,
          sideEffects: [`${packageName}/dist/style.css`]
        }
      }
    }
  }
}
