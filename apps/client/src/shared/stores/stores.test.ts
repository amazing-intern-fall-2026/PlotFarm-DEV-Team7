/**
 * @test shared/stores.test
 * @description Test suite cho Zustand global stores — shared/stores.
 *
 * Phạm vi test (unit test Zustand store — không cần render component):
 *  - authStore: kiểm tra setUser(), clearUser(), isAuthenticated getter
 *  - authStore: kiểm tra state sau login (user không null, isAuthenticated true)
 *  - authStore: kiểm tra state sau logout (user null, isAuthenticated false)
 *  - uiStore:   kiểm tra toggleSidebar() đổi isSidebarOpen đúng
 *  - uiStore:   kiểm tra setTheme() cập nhật activeTheme đúng
 *
 * Cách test Zustand store (không render component):
 *  const { getState, setState } = useAuthStore;
 *  // thao tác trực tiếp với store state
 *
 * Tool: Vitest (không cần @testing-library/react cho store tests)
 *
 * TODO: Implement sau khi các Zustand store được implement trong shared/stores
 */
import { describe } from 'vitest';

describe.todo('shared/stores — authStore (setUser, clearUser, isAuthenticated), uiStore (toggleSidebar, setTheme)');
