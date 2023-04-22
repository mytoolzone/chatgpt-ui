import { Show } from 'solid-js'
import IconEnv from './icons/Env'
import IconX from './icons/X'
import type { Accessor, Setter } from 'solid-js'

interface Props {
  canEdit: Accessor<boolean>
  systemRoleEditing: Accessor<boolean>
  setSystemRoleEditing: Setter<boolean>
  currentSystemRoleSettings: Accessor<string>
  setCurrentSystemRoleSettings: Setter<string>
}

export default (props: Props) => {
  let systemInputRef: HTMLTextAreaElement

  const handleButtonClick = () => {
    props.setCurrentSystemRoleSettings(systemInputRef.value)
    props.setSystemRoleEditing(false)
  }

  return (
    <div class="my-4">
      <Show when={!props.systemRoleEditing()}>
        <Show when={props.currentSystemRoleSettings()}>
          <div>
            <div class="fi gap-1 op-50 dark:op-60">
              <Show when={props.canEdit()} fallback={<IconEnv />}>
                <span onClick={() => props.setCurrentSystemRoleSettings('')} class="sys-edit-btn p-1 rd-50%" > <IconX /> </span>
              </Show>
              <span>System Role: </span>
            </div>
            <div class="mt-1">
              {props.currentSystemRoleSettings()}
            </div>
          </div>
        </Show>
        <Show when={!props.currentSystemRoleSettings() && props.canEdit()}>
          <span onClick={() => props.setSystemRoleEditing(!props.systemRoleEditing())} class="sys-edit-btn">
            <IconEnv />
            <span>设置角色</span>
          </span>
        </Show>
      </Show>
      <Show when={props.systemRoleEditing() && props.canEdit()}>
        <div>
          <div class="fi gap-1 op-50 dark:op-60">
            <IconEnv />
            <span>系统角色:</span>
          </div>
          <p class="my-2 leading-normal text-sm op-50 dark:op-60">请指导助手并设置助手的行为。</p>
          <div>
            <textarea
              ref={systemInputRef!}
              placeholder="你是一个乐于助人的助手，尽可能简明扼要地回答.... "
              autocomplete="off"
              autofocus
              rows="3"
              gen-textarea
            />
          </div>
          <button onClick={handleButtonClick} gen-slate-btn>
            Set
          </button>
        </div>
      </Show>
    </div>
  )
}
