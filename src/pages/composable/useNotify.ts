import { useQuasar } from "quasar";

export default function useNotify() {
    const $q = useQuasar();

    const notifySuccess = (message: string) => {
        $q.notify({ type: "positive", message });
    };

    const notifyError = (message: string) => {
        $q.notify({
            type: "negative",
            message
        });
    };

    const notifyWarning = (message: string) => {
        $q.notify({
            type: "warning",
            message
        });
    };

    const notifyInfo = (message: string) => {
        $q.notify({
            type: "info",
            message
        });
    };

    const notifyOngoing = (message: string) => {
        $q.notify({
            type: "ongoing",
            message
        });
    };

    return {
        notifyError,
        notifySuccess,
        notifyWarning,
        notifyInfo,
        notifyOngoing
    };
}
