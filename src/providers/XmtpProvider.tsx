import React from 'react';
import { useCallback, useEffect, useReducer, useState } from 'react';
import { Conversation, Message } from '@xmtp/xmtp-js';
import { Client } from '@xmtp/xmtp-js';
import { Signer } from 'ethers';
import { XmtpContext, XmtpContextType } from "../context/xmtp";
import { useSigner } from 'wagmi';

type Pros = {
    children: React.ReactChild;
}


export const XmtpProvider: React.FC<Pros> = ({ children }) => {

    const [client, setClient] = useState<Client | null>();
    const { data: signer } = useSigner();

    const [loadingConversations, setLoadingConversations] = useState<boolean>(false);
    const [convoMessages, setConvoMessages] = useState<Map<string, Message[]>>(new Map());

    const [conversations, dispatchConversations] = useReducer(
        (
            state: Map<string, Conversation>,
            newConvos: Conversation[] | undefined
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ): any => {
            if (newConvos === undefined) {
            return new Map()
        }
        newConvos.forEach((convo) => {
            if (convo.peerAddress !== client?.address) {
                if (state && !state.has(convo.peerAddress)) {
                    state.set(convo.peerAddress, convo)
                } else if (state === null) {
                    state = new Map()
                    state.set(convo.peerAddress, convo)
                }
            }
        })
        return state ?? new Map()
    }, [])

    const initClient = useCallback(
        async (wallet: Signer) => {
        if (wallet && !client) {
            try {
                setClient(await Client.create(wallet!))
            } catch (e) {
                console.error(e)
            setClient(null)
            }
        }
    }, [ client ]);

    const disconnect = () => {
        setClient(undefined);
        dispatchConversations(undefined);
    }

    useEffect(() => {
        signer ? initClient(signer) : disconnect()
    }, [ signer ]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!client) return;

        const listConversations = async () => {
            console.log('Listing conversations')
            setLoadingConversations(true)
            const convos = await client.conversations.list()
            for (const convo of convos) {
                const messages = await convo.messages()
                convoMessages.set(convo.peerAddress, messages)
                setConvoMessages(convoMessages)
                dispatchConversations([convo])
            }
        setLoadingConversations(false);
        }
        listConversations()
    }, [ client ]) // eslint-disable-line react-hooks/exhaustive-deps

    const [providerState, setProviderState] = useState<XmtpContextType>({
        client,
        conversations,
        loadingConversations,
        initClient,
        convoMessages,
    });

    useEffect(() => {
        setProviderState({
            client,
            conversations,
            loadingConversations,
            initClient,
            convoMessages,
        })
    }, [client, conversations, convoMessages, initClient, loadingConversations])

    return (
        <XmtpContext.Provider value={providerState}>
            { children }
        </XmtpContext.Provider>
    );
}

export default XmtpProvider