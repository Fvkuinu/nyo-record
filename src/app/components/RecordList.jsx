// src/app/components/RecordList.jsx
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import Card from '@/app/ui/Card';
import Button from '@/app/ui/Button';
import Dialog from '@/app/ui/Dialog';
import useDialog from '@/app/hooks/useDialog';
import CollapsibleSection from '@/app/ui/CollapsibleSection'; // Import the updated collapsible section

const RecordList = ({ records, selectedDate, onDelete }) => {
    const toast = useToast();
    const { isOpen, openDialog, closeDialog } = useDialog();
    const [activeRecordId, setActiveRecordId] = useState(null); // State to track the active record to delete

    if (!selectedDate) {
        return <p className="text-gray-500">Please select a date.</p>;
    }

    if (records.length === 0) {
        return <p className="text-gray-500">選択された日には記録がありません</p>;
    }

    // Handle record deletion and feedback
    const confirmAndDelete = async () => {
        try {
            await onDelete(activeRecordId); // Delete the active record
            toast({
                title: '記録を削除しました',
                description: '記録の削除に成功しました',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-right',
            });
            closeDialog();
        } catch (error) {
            toast({
                title: '記録を削除できませんでした',
                description: `記録の削除に失敗しました: ${error.message}`,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-right',
            });
        }
    };

    return (
        <CollapsibleSection title={`${selectedDate} の記録`}>
            {records.map((record) => {
                let dateObj;
                if (record.dateTime && typeof record.dateTime.toDate === 'function') {
                    dateObj = record.dateTime.toDate();
                } else if (record.dateTime instanceof Date) {
                    dateObj = record.dateTime;
                } else {
                    dateObj = new Date(record.dateTime);
                }

                const isValidDate = dateObj instanceof Date && !isNaN(dateObj);

                function getHourMin() {
                    if (!isValidDate) return 'Invalid Date';
                    const [hours, minutes] = dateObj.toLocaleTimeString().split(':');
                    return `${hours}:${minutes}`;
                }

                return (
                    <React.Fragment key={record.id}>
                        <Card
                            title={getHourMin()}
                            content={record.remarks}
                            footer={
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        setActiveRecordId(record.id); // Set the record to delete
                                        openDialog(); // Open the confirmation dialog
                                    }}
                                >
                                    削除
                                </Button>
                            }
                        />
                    </React.Fragment>
                );
            })}

            {/* Confirmation dialog */}
            <Dialog isOpen={isOpen} onClose={closeDialog} title="削除の確認">
                <p className="mb-4">このレコードを本当に削除してもよろしいですか？</p>
                <div className="flex justify-end space-x-2">
                    <Button variant="secondary" onClick={closeDialog}>
                        キャンセル
                    </Button>
                    <Button variant="danger" onClick={confirmAndDelete}>
                        削除
                    </Button>
                </div>
            </Dialog>
        </CollapsibleSection>
    );
};

export default RecordList;
