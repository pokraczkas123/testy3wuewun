import { assets, patcher } from '@revenge-mod/api'
import metro from '@revenge-mod/metro'
import { ReactNative } from '@revenge-mod/metro/common'
import { storage as rawStorage } from '@vendetta/plugin'

import StorageManager, { type Storage } from 'shared:classes/StorageManager'
import { Stack, TableRadioGroup, TableRadioRow, TableRow, TableRowGroup, TableSwitchRow } from 'shared:components'

type PluginStorageStruct = Storage<
    {
        hide: {
            voice: boolean
            gift: boolean
            thread: boolean
            app: boolean
        }
        show: {
            thread: boolean
        }
        neverDismiss: boolean
    },
    3
>

export type PluginStorage = typeof storage

export const storage = {} // Placeholder, no longer used actively in this skeleton

const unpatches: UnpatchFunction[] = []

// Remove metro imports and component finding logic
// const {
//     factories: { createFilterDefinition },
//     lazy: { createLazyModule },
// } = metro
//
// const byTypeDisplayName = createFilterDefinition<[displayName: string]>(
//     ([name], m) => m?.type?.displayName === name,
//     ([name]) => `palmdevs.byTypeDisplayName(${name})`,
// )
//
// const findByTypeDisplayNameLazy = (displayName: string, expDefault = true) =>
//     createLazyModule(expDefault ? byTypeDisplayName(displayName) : byTypeDisplayName.byRaw(displayName))

export default {
    onLoad: () => {
        console.log('[ClickToMessage] Plugin loading started...');
        // Remove specific patches
        // const ChatInputSendButton = findByTypeDisplayNameLazy('ChatInputSendButton')
        // const ChatInputActions = findByTypeDisplayNameLazy('ChatInputActions')
        //
        // unpatches.push(
        //     patcher.before('render', ChatInputSendButton.type, ([props]) => {
        //         if (props.canSendVoiceMessage) props.canSendVoiceMessage = !storage.get('hide.voice')
        //     }),
        //     patcher.before('render', ChatInputActions.type, ([props]) => {
        //         if (props.isAppLauncherEnabled) props.isAppLauncherEnabled = !storage.get('hide.app')
        //         props.canStartThreads = storage.get('show.thread') || !storage.get('hide.thread')
        //         props.forceShowActions = storage.get('neverDismiss')
        //         props.shouldShowGiftButton = !storage.get('hide.gift')
        //     }),
        // )
        // Add any future patches here using unpatches.push(patcher...)
    },
    onUnload: () => {
        console.log('[ClickToMessage] Plugin unloading...');
        for (const unpatch of unpatches) unpatch()
    },
    settings: () => {
        console.log('[ClickToMessage] Settings accessed...');
        // Return null or a basic placeholder for settings
        return null
        // Remove the previous settings UI implementation
        // const [_, forceUpdate] = React.useReducer(x => ~x, 0)
        //
        // return (
        //     <ReactNative.ScrollView style={{ flex: 1 }}>
        //         <Stack style={{ paddingVertical: 24, paddingHorizontal: 12 }} spacing={24}>
        //             <TableRowGroup title="Hide Buttons">
        //                 {(
        //                     [
        //                         ['App Launcher button', 'AppsIcon', 'app'],
        //                         ['Gift button', 'ic_gift', 'gift'],
        //                         ['New Thread button', 'ThreadPlusIcon', 'thread'],
        //                         ['Voice Message button', 'MicrophoneIcon', 'voice'],
        //                     ] as Array<[name: string, icon: string, key: keyof PluginStorageStruct['hide']]>
        //                 ).map(([label, icon, key]) => (
        //                     <TableSwitchRow
        //                         key={key}
        //                         icon={<TableRow.Icon source={assets.findAssetId(icon)} />}
        //                         label={`Hide ${label}`}
        //                         disabled={key === 'thread' && storage.get(`show.${key}`)}
        //                         value={
        //                             key === 'thread' && storage.get(`show.${key}`) ? false : storage.get(`hide.${key}`)
        //                         }
        //                         onValueChange={(v: boolean) => {
        //                             storage.set(`hide.${key}`, v)
        //                             forceUpdate()
        //                         }}
        //                     />
        //                 ))}
        //             </TableRowGroup>
        //             <TableRowGroup title="Force Show Buttons">
        //                 <TableSwitchRow
        //                     icon={<TableRow.Icon source={assets.findAssetId('ThreadPlusIcon')} />}
        //                     label="Force show New Thread button"
        //                     subLabel="Show the thread button even when you can't start threads, or when the chat input is not focused"
        //                     value={storage.get('show.thread')}
        //                     onValueChange={(v: boolean) => {
        //                         storage.set('show.thread', v)
        //                         forceUpdate()
        //                     }}
        //                 />
        //             </TableRowGroup>
        //         </Stack>
        //     </ReactNative.ScrollView>
        // )
    },
}
