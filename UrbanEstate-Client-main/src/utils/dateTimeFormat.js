export const getFormattedDate = (createdAt) => {
    const messageDate = new Date(createdAt);
    const now = new Date();
    const diffInHours = Math.abs(now - messageDate) / (1000 * 60 * 60);

    if (diffInHours < 24) {
        // Calculate relative time
        const diffInMinutes = Math.floor((now - messageDate) / (1000 * 60));

        if (diffInMinutes < 60) {
            return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
        }

        const diffInHours = Math.floor(diffInMinutes / 60);
        return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else {
        // Format date and time
        return messageDate.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }
};
