import { Toaster as ArkToaster, createToaster, Toast, useToastContext } from '@ark-ui/solid/toast'
import { Check, TriangleAlert } from 'lucide-solid'
import { Show } from 'solid-js'
import { Portal } from 'solid-js/web'
import { createStyleContext, HStack, Stack, styled } from 'styled-system/jsx'
import { toast } from 'styled-system/recipes'
import { CloseButton } from './close-button'
import { Icon, type IconProps } from './icon'
import { Spinner } from './spinner'

const { withProvider, withContext } = createStyleContext(toast)

const Root = withProvider(Toast.Root, 'root')
const Title = withContext(Toast.Title, 'title')
const Description = withContext(Toast.Description, 'description')
const ActionTrigger = withContext(Toast.ActionTrigger, 'actionTrigger')
const CloseTrigger = withContext(Toast.CloseTrigger, 'closeTrigger')
const StyledToaster = styled(ArkToaster)

// 通知の設定を一括管理するオブジェクト
export const notify = {
  warning: (description: string) =>
    toaster.create({
      description,
      type: "warning",
      closable: true,
      duration: 5000,
    }),
  success: (description: string) =>
    toaster.create({
      description,
      type: "success",
      closable: true,
      duration: 4000,
    }),

  error: (description: string) =>
    toaster.create({
      description,
      type: "error",
      closable: true,
      duration: 8000,
    }),
};

const iconMap: Record<string, any> = {
  warning: TriangleAlert,
  success: Check,
  error: TriangleAlert,
}

const paletteMap: Record<string, any> = {
  warning: 'yellow.8',
  success: 'green.8',
  error: 'red.8',
}

const Indicator = (props: IconProps) => {
  const toast = useToastContext()

  const StatusIcon = () => iconMap[toast().type]

  return (
    <Show when={StatusIcon()}>
      {(Icon_) => (
        <Icon
          data-type={toast().type}
          {...props}
          color={paletteMap[toast().type]}
        >
          <Icon_ />
        </Icon>
      )}
    </Show>
  )
}

export const toaster = createToaster({
  placement: 'bottom',
  pauseOnPageIdle: true,
  overlap: true,
  max: 5,
})

export const Toaster = () => {
  return (
    <Portal>
      <StyledToaster toaster={toaster} insetInline={{ mdDown: '4' }}>
        {(toast) => (
          <Root>
            <HStack>
              <Show
                when={toast().type === 'loading'}
                fallback={
                  <Indicator />
                }
              >
                <Spinner color="colorPalette.plain.fg" />
              </Show>

              <Stack gap="3" alignItems="start">
                <Stack gap="1" pt="1">
                  <Show when={toast().title}>
                    <Title>{toast().title}</Title>
                  </Show>
                  <Show when={toast().description}>
                    <Description>{toast().description}</Description>
                  </Show>
                </Stack>
                <Show when={toast().action}>
                  {(action) => <ActionTrigger>{action().label}</ActionTrigger>}
                </Show>
              </Stack>
            </HStack>

            <Show when={toast().closable}>
              <CloseTrigger>
                <CloseButton size="sm" />
              </CloseTrigger>
            </Show>
          </Root>
        )}
      </StyledToaster>
    </Portal>
  )
}
