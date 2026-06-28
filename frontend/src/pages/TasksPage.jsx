import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import SkeletonRow from '../components/SkeletonRow';
import StatsBar from '../components/StatsBar';
import Button from '../components/Button';
import './TasksPage.css';

const TasksPage = () => {
  const {
    tasks,
    isLoading,
    error,
    statusFilter,
    setStatusFilter,
    search,
    setSearch,
    sortBy,
    order,
    setSortBy,
    setOrder,
    addTask,
    editTask,
    removeTask,
    toggleComplete,
    refetch,
  } = useTasks();

  const [formModal, setFormModal] = useState({ isOpen: false, task: null });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, task: null });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSortChange = (field, dir) => {
    setSortBy(field);
    setOrder(dir);
  };

  const openCreateModal = () => setFormModal({ isOpen: true, task: null });
  const openEditModal = (task) => setFormModal({ isOpen: true, task });
  const closeFormModal = () => setFormModal({ isOpen: false, task: null });

  const handleFormSubmit = async (data) => {
    if (formModal.task) {
      await editTask(formModal.task._id, data);
    } else {
      await addTask(data);
    }
    closeFormModal();
  };

  const openDeleteConfirm = (task) => setConfirmDialog({ isOpen: true, task });
  const closeDeleteConfirm = () => setConfirmDialog({ isOpen: false, task: null });

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await removeTask(confirmDialog.task._id);
      closeDeleteConfirm();
    } finally {
      setIsDeleting(false);
    }
  };

  const hasActiveFilters = statusFilter || search;

  return (
    <div className="tasks-page">
      <div className="tasks-page__header">
        <div className="tasks-page__heading">
          <h1>Today's tasks</h1>
          <StatsBar tasks={tasks} />
        </div>
        <Button variant="primary" onClick={openCreateModal}>
          + New task
        </Button>
      </div>

      <div className="tasks-page__controls">
        <SearchBar value={search} onChange={setSearch} />
        <FilterBar
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          sortBy={sortBy}
          order={order}
          onSortChange={handleSortChange}
        />
      </div>

      {error ? <ErrorMessage message={error} onRetry={refetch} /> : null}

      <div className="tasks-page__list">
        {isLoading ? (
          <>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </>
        ) : tasks.length === 0 ? (
          <EmptyState
            title={hasActiveFilters ? 'No matching tasks' : 'Your list is empty'}
            message={
              hasActiveFilters
                ? 'Try a different search term or clear your filters.'
                : 'Add your first task to start tracking your work.'
            }
            actionLabel={hasActiveFilters ? undefined : 'Create a task'}
            onAction={hasActiveFilters ? undefined : openCreateModal}
          />
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onToggleComplete={toggleComplete}
              onEdit={openEditModal}
              onDelete={openDeleteConfirm}
            />
          ))
        )}
      </div>

      <Modal
        isOpen={formModal.isOpen}
        onClose={closeFormModal}
        title={formModal.task ? 'Edit task' : 'New task'}
      >
        <TaskForm initialTask={formModal.task} onSubmit={handleFormSubmit} onCancel={closeFormModal} />
      </Modal>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={closeDeleteConfirm}
        onConfirm={handleConfirmDelete}
        title="Delete this task?"
        message={`"${confirmDialog.task?.title}" will be permanently removed. This can't be undone.`}
        confirmLabel="Delete"
        isLoading={isDeleting}
      />
    </div>
  );
};

export default TasksPage;
